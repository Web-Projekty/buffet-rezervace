type ModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ setIsOpen }: ModalProps) => {
  return (
    <>
      <div className="bg-transparentBlack" onClick={() => setIsOpen(false)}>
        <div className="rounded-xl bg-orange-300 p-10">Modal</div>
      </div>
    </>
  );
};

export default Modal;
