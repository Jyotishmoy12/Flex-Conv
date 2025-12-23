# 🚀 Flex-Conv
### The Swiss Army Knife for Local File Conversion

**Flex-Conv** is a professional-grade Command Line Interface (CLI) tool designed for **privacy-conscious users**.  
It converts images, documents, and data files **entirely on your local machine** —  
**no cloud uploads, no ads, and zero privacy risks.**

---

## ✨ Key Features

### 🔐 Privacy First
- All conversions happen locally using specialized engines
- No data ever leaves your computer

### 🧩 Modular Engine Architecture
- **Sharp** — High-performance raster image processing
- **LibreOffice (`soffice`)** — Professional document-to-PDF rendering
- **SheetJS** — Deep binary parsing for Excel and CSV files

### 📦 Batch Processing
- Convert entire directories in one go
- Automatically filters out system and unsupported files

### 👀 Watch Mode
- Monitor folders in real time
- Drop a file in, and it converts automatically
- Optimized with depth control and stability thresholds to prevent crashes

### 🧠 Smart Routing & Cross-Conversion
- Intelligent engine selection based on the target format
- **New:** Bridging formats  
  - Example: Convert **Excel (`.xlsx`) → Word (`.docx`)** directly

---

## 🛠 Installation

### 🌍 Global Installation (Recommended)

```bash
npm install -g flex-conv
```

Run from anywhere:
```bash
flex-conv
```

---

### 🧑‍💻 Local Installation (Development)

```bash
git clone https://github.com/Jyotishmoy12/Flex-Conv.git
cd flex-conv
npm install
npm link
```

---

## 📋 Prerequisites

- **Node.js**: v16 or higher
- **LibreOffice (Recommended)**  
  Required for high-quality PDF, document, and cross-conversion support

> **Note:**  
> Flex-Conv first looks for `soffice` in your system `PATH`.  
> If not found, it attempts the default installation path:
>
> `C:\Program Files\LibreOffice`

---

## 🚀 Usage

### 📖 Help Command
View all available flags and examples:

```bash
flex-conv --help
```

---

### 🛠 Direct Commands

```bash
flex-conv [path] -t [target] [flags]
```

#### Examples

| Feature | Command |
|------|------|
| Single File | `flex-conv image.png -t webp` |
| Batch Folder | `flex-conv ./my_documents -t pdf` |
| Watch Mode | `flex-conv ./input_folder -t jpg --watch` |
| Cross-Convert | `flex-conv data.xlsx -t docx` |

---

## 📊 Supported Formats

### 🖼 Images
**Input:** `.png`, `.jpg`, `.jpeg`, `.webp`  
**Output:** `png`, `jpg`, `webp`, `pdf`

### 📄 Documents
**Input:** `.docx`, `.doc`, `.txt`, `.pdf`  
**Output:** `pdf`, `docx`, `txt`

### 📈 Data
**Input:** `.xlsx`, `.xls`, `.csv`  
**Output:** `xlsx`, `csv`, `pdf`, `docx`  

---

## 📜 License
**ISC License**

---

## ⭐ Why Flex-Conv?
- 100% offline & private
- Developer-friendly CLI
- Modular and extensible architecture
- Built for speed, safety, and real-world workflows

---

Happy converting 🚀
