"use client";
import React, {useRef, useEffect, useState} from "react";
import {SubmitButton} from "@/components/Form/SubmitButton";
import {assets} from "@/assets/images/assets";
import "@/styles/form.css";

interface FormData {
    name: string;
    phone: string;
    contact: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export const InputDesign: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        contact: "",
    });
    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        contact: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({type: null, message: ""});
    
    function checkError (field: string){
        const tempErros = errors;
        
        if (field === "name")tempErros.name = !formData.name.trim()
        else if (field === "phone")tempErros.phone = !/^\+\d+$/.test(formData.phone.trim())
        else if (field === "contact")tempErros.contact = !formData.contact.trim()
        
        setErrors(tempErros);

    }

    const handleFieldChange = (field: keyof FormData) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Очищаем статус при изменении полей
        if (submitStatus.type) {
            setSubmitStatus({type: null, message: ""});
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: !formData.name.trim(),
            phone: !/^\+\d+$/.test(formData.phone.trim()),
            contact: !formData.contact.trim(),
        };

        setErrors(newErrors);

        // Проверяем заполненность полей
        if (!formData.name.trim() || !formData.phone.trim() || !formData.contact.trim()) {
            setSubmitStatus({
                type: "error",
                message: "Пожалуйста, заполните все поля"
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({type: null, message: ""});

        try {
            // Отправляем данные на бэкенд
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    phone: formData.phone.trim(),
                    contact: formData.contact.trim(),
                }),
            });

            console.log('Отправляемые данные:', {
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                contact: formData.contact.trim(),
            });

            const result: ApiResponse = await response.json();

            if (result.success) {
                setSubmitStatus({
                    type: "success",
                    message: "Спасибо за регистрацию! Ваши данные успешно сохранены."
                });

                // Очищаем форму после успешной отправки
                setFormData({
                    name: "",
                    phone: "",
                    contact: "",
                });
            } else {
                setSubmitStatus({
                    type: "error",
                    message: result.error || "Произошла ошибка при отправке данных"
                });
            }
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            setSubmitStatus({
                type: "error",
                message: "Ошибка соединения с сервером. Попробуйте позже."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const individualRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target === individualRef.current) {
                    individualRef.current?.classList.add("visible");
                }
            });
        }, {
            threshold: 0.5,
        });

        if (individualRef.current) observer.observe(individualRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <section id={"form"}>
                <div ref={individualRef} className="wrapper reveal">
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                        src={assets.formImage.src}
                        alt=""
                        className={"form-image"}

                    />

                    <div className={"form-content-section"}>
                        <h1>запись на обучение</h1>

                        {/* Показываем статус отправки */}
                        {submitStatus.type && (
                            <div className={`form-status ${submitStatus.type}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <form className={"registration-form"} onSubmit={handleSubmit}>
                            <div className={"form-fields-container"}>
                                <input
                                    type="text"
                                    placeholder="Имя"
                                    value={formData.name}
                                    onChange={(e) => {handleFieldChange("name")(e.target.value)
                                        checkError("name");
                                    }}
                                    name="name"
                                    className={`field-input ${errors.name ? "error" : ""}`}
                                    aria-invalid={errors.name}
                                    disabled={isSubmitting}
                                />

                                <input
                                    type="tel"
                                    inputMode="tel"
                                    placeholder="Номер телефона"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        let val = e.target.value.replace(/[^\d+]/g, "");
                                        if (val.indexOf("+") > 0) val = val.replace(/\+/g, "");
                                        if (val.startsWith("+")) val = "+" + val.slice(1).replace(/\+/g, "");
                                        else val = val.replace(/\+/g, "");
                                        handleFieldChange("phone")(val);
                                        checkError("phone");
                                    }}
                                    name="phone"
                                    className={`field-input ${errors.phone ? "error" : ""}`}
                                    aria-invalid={errors.phone}
                                    disabled={isSubmitting}
                                    pattern="^\+\d+$"
                                    title="Номер телефона должен начинаться с + и содержать только цифры"
                                />

                                <input
                                    type="text"
                                    placeholder="@Telegram / email"
                                    value={formData.contact}
                                    onChange={(e) => {
                                        handleFieldChange("contact")(e.target.value);
                                        checkError("contact");
                                    }}
                                    name="contact"
                                    className={`field-input ${errors.contact ? "error" : ""}`}
                                    aria-invalid={errors.contact}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <SubmitButton
                                onClick={() => handleSubmit}
                                disabled={isSubmitting}
                                isLoading={isSubmitting}
                            />
                        </form>
                    </div>
                </div>
            </section>
            <div className={"footer-blankspace"}></div>
        </>
    );
};

export default InputDesign;