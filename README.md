# 🚀 Flex-Conv  
**The Swiss Army Knife for Local File Conversion**

Flex-Conv is a professional-grade Command Line Interface (CLI) tool designed for privacy-conscious users. It handles images, documents, and data files entirely on your local machine—**no cloud uploads, no ads, and no privacy risks**.

---

## ✨ Key Features

- **Privacy First**  
  All conversions happen locally using specialized engines.

- **Modular Engine Architecture**
  - **Sharp**: High-performance raster image processing
  - **LibreOffice (soffice)**: Professional document-to-PDF rendering
  - **SheetJS**: Deep binary parsing for Excel and CSV

- **Batch Processing**  
  Convert entire folders with a single command.

- **Watch Mode**  
  Monitor folders in real-time and automate your workflow.

- **Smart Routing**  
  Automatically selects the best engine based on your target format.

---

## 🛠 Installation

### 1. Prerequisites

- **Node.js**: v16 or higher  
- **LibreOffice** (Recommended): For high-quality PDF and document support  

> **Note:** Ensure `soffice` is in your system `PATH` or installed at the default location.

---

### 2. Setup

```bash
git clone https://github.com/Jyotishmoy12/Flex-Conv.git
cd flex-conv
npm install
```

---

### 3. Global Activation

```bash
npm link
```

> **Administrator privileges required**

---

## 🚀 Usage

### Interactive Mode

```bash
flex-conv
```

---

### Direct Commands (Power User)

```bash
flex-conv [path] -t [target] [flags]
```

| Feature       | Command |
|--------------|--------|
| Single File  | `flex-conv image.png -t webp` |
| Batch Folder | `flex-conv ./my_documents -t pdf` |
| Watch Mode   | `flex-conv ./input_folder -t jpg --watch` |

---

## 📂 Supported Formats

| Engine     | Inputs                          | Outputs               |
|-----------|---------------------------------|-----------------------|
| Images    | .png, .jpg, .jpeg, .webp        | png, jpg, webp, pdf   |
| Documents | .docx, .doc, .txt, .pdf         | pdf, docx, txt        |
| Data      | .xlsx, .xls, .csv               | xlsx, csv, pdf        |

---

## 🔧 Configuration & Customization

To add new formats:

1. Add a new engine in `src/engines/`
2. Update routing logic in `src/main.js`

Changes apply globally due to `npm link`.

---

## 📜 License

ISC License
