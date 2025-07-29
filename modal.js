function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.addEventListener('DOMContentLoaded', function () {
    const triggers = document.querySelectorAll('[data-gallery-modal-trigger]');
    /** @var modalTemplate {HTMLTemplateElement} */
    const modalTemplate = document.getElementById('gallery-modal-template');
    triggers.forEach(modal => {
        modal.addEventListener('click', function (event) {
            event.preventDefault();
            const modalClone = modalTemplate.content.cloneNode(true);
            const modalElement = modalClone.querySelector('.gallery-modal');
            const title = modal.getAttribute('data-title') || '';
            const imageSrc = modal.querySelector('img').src;
            const description = modal.getAttribute('data-description') || '説明';

            modalClone.querySelector('[data-modal-placeholder="title"]').textContent = title;
            modalClone.querySelector('[data-modal-placeholder="image"]').src = imageSrc;
            modalClone.querySelector('[data-modal-placeholder="description"]').innerHTML = escapeHtml(description).trim().replace(/\n/g, '<br>');
            modalClone.querySelector('[data-model-element="move"]').href = modal.getAttribute('href') || '#';

            document.querySelector('.modals').appendChild(modalClone);
            document.body.style.marginRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
            document.body.style.overflow = 'hidden';

            const closeButton = document.querySelector('[data-modal-element="close"]');
            closeButton.addEventListener('click', () => {
                document.querySelector('.gallery-modal').remove();
                document.body.style.marginRight = '';
                document.body.style.overflow = '';
            });

            const modalBackground = document.querySelector('[data-modal-element="background"]');
            modalBackground.addEventListener('click', () => {
                document.querySelector('.gallery-modal').remove();
                document.body.style.marginRight = '';
                document.body.style.overflow = '';
            });
        });
    });
});
