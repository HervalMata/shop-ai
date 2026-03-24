export const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', "ml_default");

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Falha no Carregamento da imagem");
        }

        const data = await response.json();

        return data.secure_url;
    } catch (error) {
        console.error('Erro no carregamento para o cloudinary');
        throw error;
    }
};

export const handleImageChange = (event, setImageFile, setImagePreview) => {
    const file =  event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
        throw new Error("Somente arquivos de imagem são permitidos");
    }

    if (file.size > 5 * 1024 * 1024) {
        throw new Error("O tamanho da imagem deve ser menor que 5MB");
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
        setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
};
