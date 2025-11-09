
import React, { useState, useCallback, useEffect, useRef } from 'react';
// FIX: Import 'useDropzone' to enable drag-and-drop functionality for image uploads.
import { useDropzone } from 'react-dropzone';
import { CameraIcon } from './icons/CameraIcon';
import { UserIcon } from './icons/UserIcon';
import { SparklesIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (base64Image: string) => void;
  currentImage?: string | null;
  isAnalyzing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, currentImage, isAnalyzing }) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const cleanupCamera = () => {
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
  };

  const startCamera = async () => {
    try {
        cleanupCamera();
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
        }
        setIsCameraOpen(true);
    } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Não foi possível acessar a câmera. Por favor, verifique as permissões no seu navegador.");
    }
  };

  useEffect(() => {
    return () => cleanupCamera();
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            setPreview(dataUrl);
            onImageUpload(dataUrl);
        }
    }
    setIsCameraOpen(false);
    cleanupCamera();
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false
  });
  
  if (isCameraOpen) {
    return (
        <div className="text-center">
            <h2 className="text-xl font-bold font-serif text-text-primary mb-2">Posicione-se para a foto</h2>
            <div className="relative w-full aspect-[3/4] mx-auto rounded-lg overflow-hidden bg-background mt-4">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
            <div className="mt-4 flex justify-center gap-4">
                 <button type="button" onClick={() => { setIsCameraOpen(false); cleanupCamera(); }} className="px-4 py-2 text-sm font-medium text-text-primary bg-transparent border border-gray-600 rounded-lg">
                    Cancelar
                </button>
                <button type="button" onClick={handleCapture} className="px-6 py-2 font-bold text-background bg-primary border border-transparent rounded-lg">
                    Capturar
                </button>
            </div>
        </div>
    );
  }

  if (preview) {
    return (
       <div className="text-center">
            <p className="text-text-secondary mb-4">Esta é a sua foto base para os looks.</p>
            <div className="relative inline-block">
                <img 
                    src={preview} 
                    alt="User preview" 
                    className="w-48 h-auto mx-auto rounded-lg shadow-md mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={startCamera}
                    title="Tirar nova foto com a câmera"
                />
                {isAnalyzing && (
                     <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center text-white animate-fade-in">
                        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-sm font-semibold mt-2">Analisando...</p>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center gap-4">
                <button
                    type="button"
                    {...getRootProps()}
                    className="flex items-center justify-center mx-auto gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
                >
                    <input {...getInputProps()} />
                    <SparklesIcon className="w-5 h-5" />
                    Trocar Foto
                </button>
            </div>
       </div>
    )
  }

  return (
    <div className="text-center">
        <h2 className="text-xl font-bold font-serif text-text-primary mb-2">Comece com uma foto sua</h2>
        <p className="text-text-secondary mb-6">Para gerar looks no seu corpo, precisamos de uma foto sua de corpo inteiro.</p>
      
      <div
        {...getRootProps()}
        className={`w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-gray-600 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-text-secondary">
            <UserIcon className="w-16 h-16 mb-4 text-gray-500" />
          {
            isDragActive ?
              <p>Solte a imagem aqui ...</p> :
              <p>Arraste e solte, ou clique para selecionar</p>
          }
        </div>
      </div>
      <div className="my-4 text-center text-text-secondary text-sm">OU</div>
       <button type="button" onClick={startCamera} className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors">
            <CameraIcon className="w-5 h-5" />
            Tirar Foto com a Câmera
        </button>
    </div>
  );
};