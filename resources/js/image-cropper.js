// Image Cropper para conductores (Cropper.js v2: web components)
// Misma lógica que public/js/image-cropper.js (referencia si se empaqueta con Vite).

const CROPPER_TEMPLATE =
    '<cropper-canvas background>' +
    '<cropper-image rotatable scalable skewable translatable></cropper-image>' +
    '<cropper-shade hidden></cropper-shade>' +
    '<cropper-handle action="select" plain></cropper-handle>' +
    '<cropper-selection initial-coverage="0.8" aspect-ratio="1" movable resizable>' +
    '<cropper-grid role="grid" bordered covered></cropper-grid>' +
    '<cropper-crosshair centered></cropper-crosshair>' +
    '<cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>' +
    '<cropper-handle action="n-resize"></cropper-handle>' +
    '<cropper-handle action="e-resize"></cropper-handle>' +
    '<cropper-handle action="s-resize"></cropper-handle>' +
    '<cropper-handle action="w-resize"></cropper-handle>' +
    '<cropper-handle action="ne-resize"></cropper-handle>' +
    '<cropper-handle action="nw-resize"></cropper-handle>' +
    '<cropper-handle action="se-resize"></cropper-handle>' +
    '<cropper-handle action="sw-resize"></cropper-handle>' +
    '</cropper-selection>' +
    '</cropper-canvas>';

document.addEventListener('DOMContentLoaded', function () {
    const fotoInput = document.getElementById('foto-input');
    const cropperModal = document.getElementById('cropper-modal');
    const cropperImage = document.getElementById('cropper-image');
    const cropperContainer = document.getElementById('cropper-container');
    const cancelCropBtn = document.getElementById('cancel-crop');
    const cropBtn = document.getElementById('crop-btn');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    let cropper = null;

    if (!fotoInput || typeof window.Cropper === 'undefined') return;

    fotoInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            cropperImage.src = event.target.result;
            cropperModal.classList.remove('hidden');

            if (cropper) {
                cropper.destroy();
                cropper = null;
            }

            cropper = new window.Cropper(cropperImage, {
                container: cropperContainer,
                template: CROPPER_TEMPLATE,
            });
        };
        reader.readAsDataURL(file);
    });

    cancelCropBtn.addEventListener('click', function () {
        cropperModal.classList.add('hidden');
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
        fotoInput.value = '';
        if (previewContainer) {
            previewContainer.classList.add('hidden');
        }
    });

    cropBtn.addEventListener('click', function () {
        if (!cropper) return;

        const selection = cropper.getCropperSelection();
        if (!selection || typeof selection.$toCanvas !== 'function') return;

        selection.$toCanvas({ width: 400, height: 400 }).then(function (canvas) {
            canvas.toBlob(function (blob) {
                if (!blob) return;

                const outFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(outFile);
                fotoInput.files = dataTransfer.files;

                const prevReader = new FileReader();
                prevReader.onload = function (ev) {
                    if (previewImage) {
                        previewImage.src = ev.target.result;
                        previewContainer.classList.remove('hidden');
                    }
                };
                prevReader.readAsDataURL(blob);

                cropperModal.classList.add('hidden');
                cropper.destroy();
                cropper = null;
            }, 'image/jpeg', 0.9);
        });
    });
});

