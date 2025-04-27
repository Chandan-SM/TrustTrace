"use client";
import { useState } from "react";
import { useIncidents } from "../context/IncidentContext";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";

export const IncidentForm: React.FC = () => {
  const { addIncident } = useIncidents();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "Medium" as "Low" | "Medium" | "High",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { title: "", description: "" };

    if (formData.title.trim() === "") {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (formData.description.trim() === "") {
      newErrors.description = "Description is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      addIncident(formData);
      setFormData({ title: "", description: "", severity: "Medium" });
      setIsFormOpen(false);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  return (
    <div className="mb-4">
      {!isFormOpen ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFormOpen(true)}
          className={`flex items-center justify-center w-full py-3 text-white rounded-lg font-medium shadow-sm cursor-pointer ${
            theme === "dark"
              ? "bg-teal-900 hover:bg-teal-700"
              : "bg-teal-600 hover:bg-teal-700"
          } transition-colors`}
        >
          <PlusIcon size={20} className="mr-2" />
          Report New Incident
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-lg shadow-md p-6 border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Report New Incident
              </h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFormOpen(false)}
                className={`p-2 rounded-full ${
                  theme === "dark"
                    ? "text-gray-500 hover:text-gray-300 hover:bg-gray-700"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
              >
                <XIcon size={20} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-100 border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } ${errors.title ? "border-red-500" : ""}`}
                  placeholder="Enter incident title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-100 border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } ${errors.description ? "border-red-500" : ""}`}
                  placeholder="Provide detailed information about the incident"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Severity Level
                </label>
                <div className="flex space-x-4">
                  {["High", "Medium", "Low"].map((level) => (
                    <label
                      key={level}
                      className={`flex items-center space-x-2 cursor-pointer ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="severity"
                        value={level}
                        checked={formData.severity === level}
                        onChange={handleChange}
                        className={`focus:ring-teal-500 ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-100 border-gray-600"
                            : "bg-white text-gray-900 border-gray-300"
                        }`}
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`px-4 py-2 rounded-md font-medium shadow-sm transition-colors ${
                    theme === "dark"
                      ? "bg-teal-700 hover:bg-teal-600 text-white"
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                  }`}
                >
                  Submit Report
                </motion.button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
