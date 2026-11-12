import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactInput from "./ContactInput";
import { contactAPI } from "../api/contactApi";
import toast from "react-hot-toast";
import { FiSend, FiCheckCircle } from "react-icons/fi";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Client-side validation prior to sending
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full Name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email Address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (whatsapp.trim()) {
      const whatsappRegex = /^[+]?([0-9\s\-()]){7,25}$/;
      if (!whatsappRegex.test(whatsapp.trim())) {
        newErrors.whatsapp = "Please enter a valid WhatsApp number";
      }
    }

    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Client-side validate first
    if (!validateForm()) {
      toast.error("Please correct the form validation errors");
      return;
    }

    setLoading(true);
    try {
      const response = await contactAPI.submit({
        name,
        email,
        whatsapp,
        subject,
        message,
      });

      if (response.data.success) {
        toast.success("Message sent successfully!");
        setIsSuccess(true);
        // Reset form inputs
        setName("");
        setEmail("");
        setWhatsapp("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      console.error("Contact submit error:", error);
      if (error.response?.status === 400 && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error("Validation failed. Please review your inputs.");
      } else {
        const msg = error.response?.data?.message || "Failed to submit message. Please try again.";
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset form to send another message
  const handleReset = () => {
    setIsSuccess(false);
    setErrors({});
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          /* Contact Form Layout */
          <motion.form
            key="contact-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 hover:border-zinc-700/60 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Ambient inner glow lines */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-left mb-6">
              <h3 className="text-xl font-bold text-white tracking-wide">
                Send a Message
              </h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Fill out the details below. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              <ContactInput
                label="Full Name"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                disabled={loading}
              />

              <ContactInput
                label="Email Address"
                id="email"
                type="email"
                placeholder="john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                disabled={loading}
              />

              <ContactInput
                label="WhatsApp Number"
                id="whatsapp"
                type="tel"
                placeholder="+1 234 567 8900"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                error={errors.whatsapp}
                disabled={loading}
              />

              <ContactInput
                label="Subject"
                id="subject"
                placeholder="Collaboration Proposal"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                error={errors.subject}
                disabled={loading}
              />

              <ContactInput
                label="Message"
                id="message"
                type="textarea"
                placeholder="I would like to discuss a project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={errors.message}
                disabled={loading}
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-right">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-650 hover:from-blue-500 hover:to-purple-550 text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer disabled:opacity-50 min-h-[46px]"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Submit Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          /* Success Screen Overlay */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-8 sm:p-10 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 backdrop-blur-xl shadow-2xl text-center space-y-6"
          >
            {/* Draw checkmark animation circle */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="text-emerald-500"
              >
                <FiCheckCircle className="w-16 h-16 filter drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-wide">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Thank you for reaching out. I have received your message and will be in touch shortly.
              </p>
            </div>

            <div className="pt-2">
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white font-medium text-xs transition-all cursor-pointer"
              >
                Send Another Message
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
