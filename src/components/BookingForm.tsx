import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { getBookings, addBooking, removeBooking } from '../service/api/bookingStorage';

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 8,
  marginTop: 4,
  boxSizing: "border-box",
};

export type Passenger = {
  name: string;
  age: string;
};

export type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  passengers: Passenger[];
};

const defaultValues: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  passengers: [{ name: '', age: '' }],
};

const BookingForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    // watch,
    reset,
  } = useForm<BookingFormData>({
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'passengers',
    keyName: 'fieldId',
  });

  const [bookings, setBookings] = useState<BookingFormData[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const onSubmit = (data: BookingFormData) => {
    const arr = addBooking(data);
    setBookings(arr);
    reset(defaultValues);
  };

  const handleDelete = (idx: number) => {
    const arr = removeBooking(idx);
    setBookings(arr);
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Buchungsformular</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div style={{ marginBottom: 16 }}>
          <label>Ihr Name *</label>
          <input {...register('name', { required: 'Name ist erforderlich' })} style={inputStyle} />
          {errors.name && <div style={{ color: 'red', fontSize: 13 }}>{errors.name.message}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>E-Mail *</label>
          <input {...register('email', { required: 'E-Mail ist erforderlich', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Ungültige E-Mail' } })} style={inputStyle} />
          {errors.email && <div style={{ color: 'red', fontSize: 13 }}>{errors.email.message}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Telefon *</label>
          <input {...register('phone', { required: 'Telefon ist erforderlich', pattern: { value: /^\+?[0-9\s-]{7,}$/, message: 'Ungültige Telefonnummer' } })} style={inputStyle} />
          {errors.phone && <div style={{ color: 'red', fontSize: 13 }}>{errors.phone.message}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Passagiere</label>
          {fields.map((field, idx) => (
            <div key={field.fieldId} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <input
                placeholder={`Name Passagier ${idx + 1}`}
                {...register(`passengers.${idx}.name`, { required: 'Name ist erforderlich' })}
                style={{ flex: 2, padding: 8 }}
              />
              <input
                placeholder="Alter"
                type="number"
                min={0}
                {...register(`passengers.${idx}.age`, { required: 'Alter ist erforderlich', min: { value: 0, message: 'Ungültiges Alter' } })}
                style={{ flex: 1, padding: 8 }}
              />
              {fields.length > 1 && (
                <button type="button" onClick={() => remove(idx)} style={{ background: 'none', border: 'none', color: '#d00', fontSize: 18, cursor: 'pointer' }} title="Entfernen">✕</button>
              )}
            </div>
          ))}
          {errors.passengers && Array.isArray(errors.passengers) && errors.passengers.map((err, idx) => err && (
            <div key={idx} style={{ color: 'red', fontSize: 13 }}>
              {err.name?.message || err.age?.message}
            </div>
          ))}
          <button type="button" onClick={() => append({ name: '', age: '' })} style={{ marginTop: 8, padding: '6px 14px', borderRadius: 6, border: '1px solid #aaa', background: '#f5f5f7', cursor: 'pointer' }}>
            + Passagier hinzufügen
          </button>
        </div>
        <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 6, background: '#1a73e8', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>
          Buchen
        </button>
      </form>
    {/* Benutzerkarten */}
      <div style={{ marginTop: 32 }}>
        {bookings.length > 0 ? <h3 style={{ marginBottom: 16 }}>Alle Buchungen:</h3> : <h3>Keine Buchungen vorhanden.</h3>}
        {bookings.map((b, idx) => (
          <div key={idx} style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginBottom: 16, background: '#fafbfc', position: 'relative' }}>
            <button
              type="button"
              onClick={() => handleDelete(idx)}
              style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#d00', fontSize: 18, cursor: 'pointer' }}
              title="Buchung löschen"
            >✕</button>
            <div><b>Name:</b> {b.name}</div>
            <div><b>E-Mail:</b> {b.email}</div>
            <div><b>Telefon:</b> {b.phone}</div>
            <div><b>Passagiere:</b>
              <ol style={{ margin: 0, paddingLeft: 18 }}>
                {b.passengers.map((p, i) => (
                  <li key={i} style={{ marginTop: 6 }}>{p.name} (Alter: {p.age})</li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingForm;
