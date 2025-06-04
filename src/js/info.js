// Info button functionality
document.addEventListener('DOMContentLoaded', function() {
    const infoButton = document.getElementById('infoButton');
    const infoPopup = document.getElementById('infoPopup');
    
    if (infoButton && infoPopup) {
        // Open info popup when button is clicked
        infoButton.addEventListener('click', function() {
            infoPopup.style.display = 'flex';
        });
        
        // Close info popup when clicking outside
        infoPopup.addEventListener('click', function(e) {
            if (e.target === this) {
                closeInfo();
            }
        });
        
        // Close info popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && infoPopup.style.display === 'flex') {
                closeInfo();
            }
        });
    }
});

function closeInfo() {
    const infoPopup = document.getElementById('infoPopup');
    if (infoPopup) {
        infoPopup.style.display = 'none';
    }
}
