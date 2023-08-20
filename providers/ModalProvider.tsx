"use client";
import React, { useEffect, useState } from "react";

import Modal from "@/components/Modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Modal
        title="Test Modal"
        description="This is a test modal"
        isOpen
        onChange={() => {}}
      >
        test children
      </Modal>
    </div>
  );
};

export default ModalProvider;
