import React from 'react';
import useCreatePost from '../hooks/useCreatePost';
import { useForm, Controller } from 'react-hook-form';
import NextButton from './NextButton';

const InputComponents = {
  textarea: (field, ...args) => <textarea {...field}></textarea>,
  select: (field, ...args) => {
    const [componetConfig] = args;
    const { type } = componetConfig;
    return (
      <select {...field}>
        {type.map((optionItem, key) => (
          <option key={key}>{optionItem}</option>
        ))}
      </select>
    );
  },
  text: (field, ...args) => {
    const [componetConfig] = args;
    const { type } = componetConfig;

    if (type === 'number') {
      return <input type={type} min='0' {...field} />;
    }
    return <input type={type} {...field} />;
  },
};

const Form = ({ config }) => {
  const { setPostDetails, postDetails, current, setCurrent, steps } =
    useCreatePost();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setPostDetails({ ...postDetails, ...data });
    setCurrent(current + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {config.map((componentConfig) => (
        <React.Fragment>
          <label htmlFor={componentConfig.name}>{componentConfig.label}</label>
          <Controller
            name={componentConfig.name}
            control={control}
            defaultValue={postDetails[componentConfig.name]}
            rules={{ required: componentConfig.type !== 'checkbox' }}
            render={({ field }) => {
              return InputComponents[componentConfig.tag](
                field,
                componentConfig
              );
            }}
          />

          {errors[componentConfig.name] && <span>This field is required</span>}
        </React.Fragment>
      ))}

      <NextButton />
    </form>
  );
};

export default Form;
