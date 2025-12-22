# 🚀 Flex-Conv  
**The Swiss Army Knife for Local File Conversion**

Flex-Conv is a professional-grade Command Line Interface (CLI) tool designed for privacy-conscious users. It handles images, documents, and data files entirely on your local machine — **no cloud uploads, no ads, and no privacy risks**.

---

## ✨ Key Features

### 🔐 Privacy First  
All conversions happen locally using specialized engines.  
**No data ever leaves your computer.**

### 🧩 Modular Engine Architecture
- **Sharp** — High-performance raster image processing  
- **LibreOffice (soffice)** — Professional document-to-PDF rendering  
- **SheetJS** — Deep binary parsing for Excel and CSV  

### 📦 Batch Processing  
Convert entire folders with a single command.

### 👀 Watch Mode  
Monitor folders in real-time. Drop a file in, and it converts automatically.

### 🧠 Smart Routing  
Intelligent logic that chooses the best engine based on your target format.

---

## 🛠 Installation

### Global Installation (Recommended)

```bash
npm install -g flex-conv
```

After installation, run from anywhere:

```bash
flex-conv
```

---

### Local Installation (Optional)

```bash
npm install flex-conv
```

---

## 📋 Prerequisites

- **Node.js**: v16 or higher  
- **LibreOffice** (Recommended): For high-quality PDF and document support  

> **Note:**  
> Flex-Conv first looks for `soffice` in your system `PATH`.  
> If not found, it attempts:  
> `C:\Program Files\LibreOffice`

---

## 🚀 Usage

```bash
flex-conv
```

```bash
flex-conv [path] -t [target] [flags]
```

| Feature        | Command |
|---------------|--------|
| Single File   | `flex-conv image.png -t webp` |
| Batch Folder  | `flex-conv ./my_documents -t pdf` |
| Watch Mode    | `flex-conv ./input_folder -t jpg --watch` |

---

## 📊 Supported Formats

| Engine     | Inputs                          | Outputs               |
|-----------|----------------------------------|-----------------------|
| Images    | `.png`, `.jpg`, `.jpeg`, `.webp` | `png`, `jpg`, `webp`, `pdf` |
| Documents | `.docx`, `.doc`, `.txt`, `.pdf`  | `pdf`, `docx`, `txt` |
| Data      | `.xlsx`, `.xls`, `.csv`          | `xlsx`, `csv`, `pdf` |

---

## 📜 License

**ISC License**
