export default class AvatarSelectState {
    constructor(game) {
        this.game = game;

        this.models = ["browncoat", "beach"]; // expandable
        this.selectedModelIndex = 0;

        this.tieColor = "#ff0000";

        this.setupUI();
    }

    setupUI() {
        this.leftArrow = document.getElementById("leftArrow");
        this.rightArrow = document.getElementById("rightArrow");
        this.modelName = document.getElementById("modelName");
        this.colorPicker = document.getElementById("tieColorPicker");

        this.updateModelName();

        this.leftArrow.onclick = () => {
            this.selectedModelIndex--;
            if (this.selectedModelIndex < 0)
                this.selectedModelIndex = this.models.length - 1;

            this.updateModelName();
        };

        this.rightArrow.onclick = () => {
            this.selectedModelIndex++;
            if (this.selectedModelIndex >= this.models.length)
                this.selectedModelIndex = 0;

            this.updateModelName();
        };

        this.colorPicker.oninput = (e) => {
            this.tieColor = e.target.value;
        };
    }

    updateModelName() {
        this.modelName.textContent = this.models[this.selectedModelIndex];
    }

    update(dt) {}

    render(renderer) {
        renderer.clear();
        renderer.fillRect(0, 0, renderer.width, renderer.height, "#1a1a1a");

        // Approximate alignment with the HTML previewFrame on the left side
        const previewX = renderer.width * 0.23;
        const previewY = renderer.height * 0.50;

        // body placeholder
        renderer.fillRect(previewX - 100, previewY - 150, 200, 300, "#444");

        // tie placeholder
        renderer.fillRect(previewX - 20, previewY - 50, 40, 100, this.tieColor);
    }
}