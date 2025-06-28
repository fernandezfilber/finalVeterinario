import React, { useState } from 'react';
import './App.css';
import { RegistrarMascotas } from './registrarMascotas';

export function Mascotas({ onVolverAlDashboard }) {
  const [vista, setVista] = useState('lista'); // Estado para controlar la vista: 'lista' o 'registrar'

  return (
    <div className="mascotas-container">
      {vista === 'lista' ? (
        <>
          <h2>Mis Mascotas</h2>
          <p>Aquí puedes ver y gestionar las mascotas registradas.</p>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setVista('registrar')}
          >
            Agregar Mascota
          </button>
          <button
            className="btn btn-secondary mb-3 ms-2"
            onClick={onVolverAlDashboard}
          >
            Volver al Dashboard
          </button>
          {/* Placeholder para la lista de mascotas */}
          <div className="card">
            <div className="card-body">
              <p className="text-muted">Lista de mascotas en desarrollo.</p>
            </div>
          </div>
        </>
      ) : (
        <RegistrarMascotas
          onVolver={() => setVista('lista')}
          onRegistrar={() => {
            alert('Mascota registrada con éxito.');
            setVista('lista');
          }}
        />
      )}
    </div>
  );
}