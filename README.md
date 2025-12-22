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
The tool automatically detects directories and iterates through files.

### 👀 Watch Mode  
Monitor folders in real-time.  
Drop a file in, and it converts automatically.

### 🧠 Smart Routing  
Intelligent logic that chooses the best engine  
(e.g., routing *Image → PDF* through LibreOffice for better document wrapping).

---

## 🛠 Installation

### 1. Prerequisites

- **Node.js**: v16 or higher  
- **LibreOffice** (Recommended): For high-quality PDF and document support  

> **Note:**  
> Flex-Conv is *hardened*. It first looks for `soffice` in your system `PATH`.  
> If not found, it automatically attempts to locate it in:  
> `C:\Program Files\LibreOffice`

---

### 2. Setup

```bash
git clone https://github.com/Jyotishmoy12/Flex-Conv.git
cd flex-conv
npm install
```

---

### 3. Global Activation

To use `flex-conv` from any folder on your PC:

```bash
npm link
```

> ⚠️ Administrator privileges required  
> Once linked, you can just type `flex-conv` anywhere!

---

## 🚀 Usage

### 1. Interactive Mode

```bash
flex-conv
```

---

### 2. Direct Commands (Power User)

```bash
flex-conv [path] -t [target] [flags]
```

| Feature        | Command |
|---------------|--------|
| Single File   | `flex-conv image.png -t webp` |
| Batch Folder  | `flex-conv ./my_documents -t pdf` |
| Watch Mode    | `flex-conv ./input_folder -t jpg --watch` |

---

## 📂 Path Handling Pro-Tips

- **Relative Paths**
```bash
flex-conv ./images -t pdf
```

- **Absolute Paths**
```bash
flex-conv "C:\Users\Desktop\file.png" -t webp
```

- **Current Folder**
```bash
flex-conv . -t jpg
```

---

## 📊 Supported Formats

| Engine     | Inputs                          | Outputs               |
|-----------|----------------------------------|-----------------------|
| Images    | `.png`, `.jpg`, `.jpeg`, `.webp` | `png`, `jpg`, `webp`, `pdf` |
| Documents | `.docx`, `.doc`, `.txt`, `.pdf`  | `pdf`, `docx`, `txt` |
| Data      | `.xlsx`, `.xls`, `.csv`          | `xlsx`, `csv`, `pdf` |

---

## 🔧 Configuration & Customization

1. Add a new engine in `src/engines/`
2. Update routing logic in `src/main.js`  

Changes are instantly active globally due to `npm link`.

---

## 📜 License

**ISC License** — Open for personal and professional use.
