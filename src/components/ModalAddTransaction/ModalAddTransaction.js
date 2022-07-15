import { createPortal } from 'react-dom';
import { ReactComponent as CloseModal } from '../../img/icons/close.svg';
import '../../css/main.min.css';
import { useEffect } from 'react';
import ModalForm from './ModalForm';

const modalRoot = document.getElementById('modal-root');

function ModalAddTransaction({ isOpen }) {
  const closeModal = () => {
    isOpen(false);
    document.body.style.overflow = 'unset';
    document.body.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleEscClose = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscClose);

    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  });

  const closeOverlay = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={closeOverlay}>
      <div className="ModalAddTransaction">
        <CloseModal className="Modal__close" onClick={closeModal} />
        <div className="Modal__body">
          <h2 className="Modal__heading">Добавить транзакцию</h2>

          <ModalForm closeModal={closeModal} />
        </div>
      </div>
    </div>,
    modalRoot,
  );
}

export default ModalAddTransaction;
