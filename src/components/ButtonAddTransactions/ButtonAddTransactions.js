import { useState } from 'react';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
import { ReactComponent as AddTransaction } from '../../img/icons/add.svg';

function ButtonAddTransaction() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      document.body.scrollIntoView({ behavior: 'auto' });
    }
  };

  const modalOpen = () => {
    setIsOpen(true);
    scrollToTop();
    document.body.style.overflow = 'hidden';
  };
  return (
    <>
      <button onClick={modalOpen} className="ButtonAdd">
        <AddTransaction />
      </button>
      {isOpen && <ModalAddTransaction isOpen={setIsOpen} />}
    </>
  );
}

export default ButtonAddTransaction;
