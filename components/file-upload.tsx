'use client'

import { useState, useRef } from 'react'
import {
    Upload,
    FileText,
    Image,
    X,
    CheckCircle,
    AlertCircle,
    Loader2,
} from 'lucide-react'

interface UploadedFile {
    id: string
    name: string
    size: number
    type: string
    status: 'uploading' | 'success' | 'error'
    progress: number
    url?: string
}

interface FileUploadProps {
    bucket: string
    folder: string
    accept?: string
    maxSize?: number // in MB
    onUpload?: (url: string) => void
    multiple?: boolean
}

export default function FileUpload({
    bucket,
    folder,
    accept = 'image/*,.pdf',
    maxSize = 5,
    onUpload,
    multiple = false,
}: FileUploadProps) {
    const [files, setFiles] = useState<UploadedFile[]>([])
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files)
        }
    }

    const handleFiles = async (fileList: FileList) => {
        const newFiles: UploadedFile[] = []

        Array.from(fileList).forEach(file => {
            // Check file size
            if (file.size > maxSize * 1024 * 1024) {
                alert(`${file.name} dépasse la taille maximale de ${maxSize}MB`)
                return
            }

            const uploadedFile: UploadedFile = {
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: file.size,
                type: file.type,
                status: 'uploading',
                progress: 0,
            }

            newFiles.push(uploadedFile)
        })

        setFiles(prev => [...prev, ...newFiles])

        // Simulate upload for each file
        for (const file of newFiles) {
            await simulateUpload(file.id)
        }
    }

    const simulateUpload = async (fileId: string) => {
        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 100))
            setFiles(prev => prev.map(f =>
                f.id === fileId ? { ...f, progress: i } : f
            ))
        }

        // Mark as success
        setFiles(prev => prev.map(f =>
            f.id === fileId
                ? { ...f, status: 'success', url: `/uploads/${folder}/${f.name}` }
                : f
        ))
    }

    const removeFile = (fileId: string) => {
        setFiles(prev => prev.filter(f => f.id !== fileId))
    }

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    className="hidden"
                />

                <Upload className={`h-10 w-10 mx-auto mb-3 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                <p className="text-gray-600 mb-2">
                    Glissez vos fichiers ici ou{' '}
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        cliquez pour parcourir
                    </button>
                </p>
                <p className="text-sm text-gray-400">
                    Formats acceptés: Images, PDF • Max {maxSize}MB
                </p>
            </div>

            {/* Files List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                            <div className="p-2 bg-white rounded-lg">
                                {file.type.startsWith('image/') ? (
                                    <Image className="h-5 w-5 text-blue-500" />
                                ) : (
                                    <FileText className="h-5 w-5 text-red-500" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatSize(file.size)}
                                </p>

                                {file.status === 'uploading' && (
                                    <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 transition-all duration-200"
                                            style={{ width: `${file.progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {file.status === 'uploading' && (
                                    <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                                )}
                                {file.status === 'success' && (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                                {file.status === 'error' && (
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                )}

                                <button
                                    onClick={() => removeFile(file.id)}
                                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
