(()=>{
    document.addEventListener("DOMContentLoaded", (event) => {
        const canvas = document.getElementById('paintCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let painting = false;
        let erasing = false;
        const colorPicker = document.getElementById('colorPicker');
        const brushSize = document.getElementById('brushSize');
        const eraserButton = document.getElementById('eraser');
        const clearButton = document.getElementById('clearButton');
        const saveButton = document.getElementById('saveButton');

        function startPosition(e) {
            painting = true;
            draw(e);
        }
        function endPosition() {
            painting = false;
            ctx.beginPath();
        }
        function draw(e) {
            if (!painting) return;
            ctx.lineWidth = brushSize.value;
            ctx.lineCap = 'round';
            ctx.strokeStyle = erasing ? '#E5E5E5' : colorPicker.value;
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
        }
        function startTouchPosition(e) {
            painting = true;
            drawTouch(e);
        }
        function drawTouch(e) {
            if (!painting) return;
            e.preventDefault();
            ctx.lineWidth = brushSize.value;
            ctx.lineCap = 'round';
            ctx.strokeStyle = erasing ? '#E5E5E5' : colorPicker.value;
            const touch = e.touches[0];
            const x = touch.clientX;
            const y = touch.clientY;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', endPosition);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('touchstart', startTouchPosition);
        canvas.addEventListener('touchend', endPosition);
        canvas.addEventListener('touchmove', drawTouch);
        clearButton.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
        saveButton.addEventListener('click', () => {
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'my-note.png';
            link.click();
        });
        eraserButton.addEventListener('click', () => {
            erasing = !erasing;
            eraserButton.textContent = erasing ? 'Drawing' : 'Eraser';
        });
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    });
})();