"use client";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextField, Button, Checkbox, FormControlLabel, IconButton, Menu, MenuItem, Select, InputLabel, FormControl, Chip, Input, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SortIcon from '@mui/icons-material/Sort';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useRouter } from "next/navigation";
import axios from "axios";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([
    { question: "Untitled Question", options: ["Option 1"], type: "multiple-choice" }
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "Untitled Question", options: ["Option 1"], type: "multiple-choice" },
    ]);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push(`Option ${newQuestions[questionIndex].options.length + 1}`);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const deleteOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSelectChange = (event: any, questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].type = event.target.value;
    setQuestions(newQuestions);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMultipleSelectChange = (event: any) => {
    setSelectedOptions(event.target.value);
  };

  // Handle file selection and open the file input dialog
  const handleAddImageClick = () => {
    setOpenImageDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenImageDialog(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      alert(`File "${selectedFile.name}" selected`);
      handleCloseDialog(); 
    }
  };

  const handleSave = async () => {
    try {
      const formData = {
        title: "Untitled Form",
        description: "Form description", 
        questions: questions.map((question) => ({
          question: question.question,
          type: question.type,
          options: question.options,
        })),
      };
  
      const response = await axios.post("http://localhost:3000/api/forms", formData);
      console.log('Form saved:', response.data);
      router.push("/");
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-md px-6 py-4">
        <h1 className="text-2xl font-bold text-purple-700">Untitled Form</h1>
        <p className="text-gray-600">Form description</p>
      </div>

      <div className="w-full max-w-3xl flex justify-between items-center mt-6 px-6">
        <h2 className="text-lg font-medium text-neutral-800">Recent forms</h2>
        <div className="flex items-center space-x-4">
          <FormControl variant="outlined" size="small">
            <InputLabel>Owned by</InputLabel>
            <Select
              defaultValue="anyone"
              label="Owned by"
            >
              <MenuItem value="anyone">Owned by anyone</MenuItem>
              <MenuItem value="me">Owned by me</MenuItem>
            </Select>
          </FormControl>
          <IconButton>
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton>
            <SortIcon />
          </IconButton>
          <IconButton>
            <FolderOpenIcon />
          </IconButton>
        </div>
      </div>

      {questions.map((questionData, questionIndex) => (
        <div key={questionIndex} className="w-full max-w-3xl bg-white shadow-md rounded-md px-6 py-4 mt-6">
          <div className="flex justify-between items-center">
            <TextField
              label="Question"
              variant="outlined"
              value={questionData.question}
              onChange={(e) => updateQuestion(questionIndex, e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <IconButton
              onClick={() => deleteQuestion(questionIndex)}
              color="error"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">Multiple choice</p>
            <Button variant="text" color="primary" onClick={handleAddImageClick}>
              Add image
            </Button>
          </div>

          {/* Question Type Selection */}
          <FormControl variant="outlined" size="small" className="mb-4">
            <InputLabel>Question Type</InputLabel>
            <Select
              value={questionData.type}
              onChange={(e) => handleSelectChange(e, questionIndex)}
              label="Question Type"
            >
              <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
              <MenuItem value="single-select">Single Select</MenuItem>
              <MenuItem value="multiple-select">Multiple Select</MenuItem>
            </Select>
          </FormControl>

          {questionData.type !== 'multiple-select' ? (
            questionData.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center space-x-4 mb-3 group hover:bg-blue-50 p-2 rounded-md"
              >
                <input type="radio" disabled className="w-4 h-4 text-purple-600" />
                <TextField
                  variant="outlined"
                  value={option}
                  onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <IconButton
                  onClick={() => deleteOption(questionIndex, optionIndex)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </div>
            ))
          ) : (
            <FormControl fullWidth>
              <Select
                multiple
                value={selectedOptions}
                onChange={handleMultipleSelectChange}
                input={<Input />}
                renderValue={(selected) => (
                  <div className="flex flex-wrap gap-2">
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {questionData.options.map((option, optionIndex) => (
                  <MenuItem key={optionIndex} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button
            variant="text"
            color="primary"
            onClick={() => addOption(questionIndex)}
          >
            Add option
          </Button>

          <div className="flex items-center justify-between mt-6">
            <FormControlLabel
              control={<Checkbox />}
              label="Required"
            />
            <IconButton onClick={handleMenuOpen} size="small">
              <span className="material-icons">more_vert</span>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
            </Menu>
          </div>
        </div>
      ))}

      <Button
        variant="outlined"
        color="primary"
        onClick={addQuestion}
        className="mt-6"
      >
        Add Question
      </Button>

      <div className="w-full max-w-3xl flex justify-end mt-6">
      <button onClick={handleSave} type="button"  className="mt-6 w-full px-4 py-2 bg-blue-300 text-black rounded-lg font-bold hover:bg-blue-500">Save</button>
      </div>

      <Dialog open={openImageDialog} onClose={handleCloseDialog}>
        <DialogTitle>Upload an Image</DialogTitle>
        <DialogContent>
          <Input
            type="file"
            onChange={handleFileChange}
            fullWidth
            startAdornment={
              <InputAdornment position="start">📷</InputAdornment>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFileUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormBuilder;
