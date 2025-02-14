// Load TensorFlow.js
const modelPath = "https://raw.githubusercontent.com/curious-rookiee/sentiment-analysis-webapp/main/sentiment_analysis_model.pkl";
let model;

// Load the model
async function loadModel() {
    console.log("Loading model...");
    model = await tf.loadLayersModel(modelPath);
    console.log("Model loaded successfully!");
}

loadModel();

// Function to classify text
async function classifyText(sentence) {
    if (!model) {
        console.error("Model not loaded yet!");
        return;
    }

    // Convert text to tensor (dummy preprocessing, replace with actual)
    const inputTensor = tf.tensor([[1]]); // Replace this with actual preprocessing logic

    // Get prediction
    const prediction = model.predict(inputTensor);
    const sentimentIndex = prediction.argMax(1).dataSync()[0];

    // Map sentiment index to label
    const sentimentMap = { 1: "positive", 0: "negative", 2: "neutral" };
    return sentimentMap[sentimentIndex];
}

// Function to handle form submission
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".review-button").forEach((button) => {
        button.addEventListener("click", async (event) => {
            event.preventDefault();
            const sentence = event.target.previousElementSibling.value;

            // Get prediction
            const predictedSentiment = await classifyText(sentence);

            // Redirect or show result
            window.location.href = `/result.html?sentence=${sentence}&result=${predictedSentiment}`;
        });
    });
});
