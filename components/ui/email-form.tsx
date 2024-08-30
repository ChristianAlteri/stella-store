'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SMTPClient } from 'emailjs';

const EmailForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });

  const toggleAlert = (message: string, type: any) => {
    setAlertInfo({ display: true, message, type });
    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };

  const onSubmit = async (data: any) => {
    try {
      console.log("Form data: ", data);
      const client = new SMTPClient({
        user: 'user',
        password: 'password',
        host: 'smtp.your-email.com',
        ssl: true,
      });
      

      client.send(
        {
          text: 'i hope this works',
          from: 'you <username@your-email.com>',
          to: 'someone <someone@your-email.com>, another <another@your-email.com>',
          cc: 'else <else@your-email.com>',
          subject: 'testing emailjs',
        },
        (err, message) => {
          console.log(err || message);
        }
      );
      toggleAlert('Form submission was successful!', 'success');
    } catch (e) {
      console.error(e);
      toggleAlert('Uh oh. Something went wrong.', 'danger');
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <>
    <div className='border border-black p-2 rounded-md justify-center items-center flex flex-col'>
        <p>Contact us</p>
            <div className='ContactForm'>
        <div className='container'>
            <div className='row'>
            <div className='col-12 text-center'>
                <div className='contactForm'>
                <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='row formRow'>
                    <div className='col-6'>
                        <input
                        type='text'
                        //@ts-ignore
                        name='name'
                        {...register('name', {
                            required: 'Please enter your name',
                            maxLength: {
                            value: 30,
                            message: 'Please use 30 characters or less',
                            },
                        })}
                        className='form-control formInput'
                        placeholder='Name'
                        />
                        {errors.name && (
                        <span className='errorMessage'>
                            {errors.name.message?.toString()}
                        </span>
                        )}
                    </div>
                    <div className='col-6'>
                        <input
                        type='email'
                        //@ts-ignore
                        name='email'
                        {...register('email', {
                            required: 'Please enter a valid email address',
                            pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Please enter a valid email address',
                            },
                        })}
                        className='form-control formInput'
                        placeholder='Email address'
                        />
                        {errors.email && (
                        <span className='errorMessage'>
                            {errors.email.message?.toString()}
                        </span>
                        )}
                    </div>
                    </div>
                    <div className='row formRow'>
                    <div className='col'>
                        <input
                        type='text'
                        //@ts-ignore
                        name='subject'
                        {...register('subject', {
                            required: 'Please enter a subject',
                            maxLength: {
                            value: 75,
                            message: 'Subject cannot exceed 75 characters',
                            },
                        })}
                        className='form-control formInput'
                        placeholder='Subject'
                        />
                        {errors.subject && (
                        <span className='errorMessage'>
                            {errors.subject.message?.toString()}
                        </span>
                        )}
                    </div>
                    </div>
                    <div className='row formRow'>
                    <div className='col'>
                        <textarea
                        rows={3}
                        //@ts-ignore
                        name='message'
                        {...register('message', {
                            required: 'Please enter a message',
                        })}
                        className='form-control formInput'
                        placeholder='Message'
                        />
                        {errors.message && (
                        <span className='errorMessage'>
                            {errors.message.message?.toString()}
                        </span>
                        )}
                    </div>
                    </div>
                    <button className='submit-btn btn btn-primary' disabled={disabled} type='submit'>
                    Submit
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>
        {alertInfo.display && (
            <div className={`alert alert-${alertInfo.type} alert-dismissible mt-5`} role='alert'>
            {alertInfo.message}
            <button
                type='button'
                className='btn-close'
                data-bs-dismiss='alert'
                aria-label='Close'
                onClick={() => setAlertInfo({ display: false, message: '', type: '' })}
            />
            </div>
        )}
        </div>
    </div>
    </>
  );
};

export default EmailForm;
