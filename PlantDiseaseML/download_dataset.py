from datasets import load_dataset
import os

print("Loading dataset...")

dataset = load_dataset("mohanty/PlantVillage", "default", split="train")

# Get label names
label_names = dataset.features["labels"].names

# Classes you want
classes = [
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Healthy",
    "Potato___Late_blight",
    "Potato___Healthy",
    "Pepper___Bacterial_spot",
    "Pepper___Healthy",
    "Corn___Common_rust",
    "Corn___Healthy",
    "Apple___Black_rot"
]

# Create folders
for cls in classes:
    os.makedirs(f"dataset/{cls}", exist_ok=True)

count = {cls: 0 for cls in classes}

# Save images
for item in dataset:
    label_name = label_names[item["labels"]]

    if label_name in classes and count[label_name] < 100:
        img = item["image"]
        img.save(f"dataset/{label_name}/{label_name}_{count[label_name]}.jpg")
        count[label_name] += 1

print("Dataset ready!")