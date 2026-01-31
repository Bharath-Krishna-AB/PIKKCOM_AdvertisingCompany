"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    // CONFIGURATION: Change these values
    const phoneNumber = "919544520199"; // Enter phone number with country code (no + sign)
    const message = "Hello! I would like to inquire about your services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="wa-widget-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="wa-popup origin-bottom-left"
                    >
                        <div className="wa-header">
                            <h3 className="wa-title">Hello! 👋</h3>
                            <p className="wa-subtitle">Chat with us on WhatsApp</p>
                        </div>
                        <div className="wa-body">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="wa-btn"
                            >
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                START CHAT
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`wa-toggle ${isOpen ? 'open' : ''}`}
                aria-label="Chat on WhatsApp"
            >
                {isOpen ? (
                    <X size={28} />
                ) : (
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                )}
            </button>

            <style>{`
                .wa-widget-container {
                    position: fixed;
                    bottom: 24px;
                    left: 24px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    font-family: sans-serif;
                }
                .wa-popup {
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
                    width: 320px;
                    overflow: hidden;
                    margin-bottom: 20px;
                    border: 1px solid #f0f0f0;
                }
                .origin-bottom-left {
                    transform-origin: bottom left;
                }
                .wa-header {
                    background: white;
                    padding: 24px 24px 0 24px;
                    color: black;
                    text-align: center;
                }
                .wa-title {
                    font-size: 24px;
                    font-weight: 700;
                    margin: 0 0 4px 0;
                }
                .wa-subtitle {
                    font-size: 14px;
                    color: #4b5563;
                    margin: 0;
                }
                .wa-body {
                    padding: 24px;
                    background: white;
                }
                .wa-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    width: 100%;
                    background: #128C7E;
                    color: white;
                    font-weight: 700;
                    padding: 14px;
                    border-radius: 9999px;
                    text-decoration: none;
                    transition: background 0.2s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .wa-btn:hover {
                    background: #075e54;
                }
                .wa-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transition: transform 0.2s;
                    background: #25D366;
                    color: white;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                }
                .wa-toggle:hover {
                    transform: scale(1.05);
                }
                .wa-toggle.open {
                    background: #e5e7eb;
                    color: #4b5563;
                }
            `}</style>
        </div>
    );
};

export default WhatsAppWidget;
