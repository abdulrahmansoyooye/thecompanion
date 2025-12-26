import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface EmailFormData {
  email: string;
}

interface EmailFormProps {
  onSubmit?: (data: EmailFormData) => void;
  isLoading?: boolean;
}

export const EmailForm: React.FC<EmailFormProps> = ({
  onSubmit,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<EmailFormData>({
    mode: 'onChange'
  });

  const handleFormSubmit = (data: EmailFormData) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-start gap-[18px] self-stretch relative"
      noValidate
    >
      <div className="flex flex-col items-start gap-3 self-stretch relative">
        <div className="flex flex-col items-start gap-2 self-stretch relative">
          <label
            htmlFor="email"
            className="self-stretch text-[#111] text-sm font-normal leading-5 relative max-md:text-[13px] max-sm:text-xs"
          >
            Email Address
          </label>
          <div className="relative self-stretch">
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              className={`flex h-9 w-full px-3 py-2 text-sm border rounded-lg bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.11)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.email 
                  ? 'border-red-500 focus-visible:ring-red-500' 
                  : 'border-neutral-200 focus-visible:ring-blue-500'
              }`}
              placeholder="Enter your email address"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-xs text-red-500"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="text-white text-center text-sm font-semibold leading-5 relative gap-2.5 self-stretch cursor-pointer bg-[#FE5933] px-2.5 py-3 rounded-[14px] max-md:text-[13px] max-sm:text-xs max-sm:px-2 max-sm:py-2.5 hover:bg-[#E54A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Continue with email"
      >
        {isLoading ? 'Please wait...' : 'Continue'}
      </button>
    </form>
  );
};
