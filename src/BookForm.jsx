import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function BookForm({ initialValues = { title: '', author: '', isbn: '', publicationDate: '' }, onSubmit }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    publicationDate: Yup.date().required('Publication Date is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
    navigate('/books'); 
  };

  return (
    <div>
      <h2>Add Book</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <Field type="text" id="title" name="title" className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`} />
              <ErrorMessage name="title" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <Field type="text" id="author" name="author" className={`form-control ${errors.author && touched.author ? 'is-invalid' : ''}`} />
              <ErrorMessage name="author" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <Field type="text" id="isbn" name="isbn" className={`form-control ${errors.isbn && touched.isbn ? 'is-invalid' : ''}`} />
              <ErrorMessage name="isbn" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="publicationDate" className="form-label">Publication Date</label>
              <Field type="date" id="publicationDate" name="publicationDate" className={`form-control ${errors.publicationDate && touched.publicationDate ? 'is-invalid' : ''}`} />
              <ErrorMessage name="publicationDate" component="div" className="invalid-feedback" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
