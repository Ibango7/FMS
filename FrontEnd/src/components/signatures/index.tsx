'use client';
import React, { useState } from "react";
import { List, Modal, Button } from "antd";

interface Signature {
  filename: string;
  signer: string;
  status: string;
  signingDate: string;
  metadata: string;
}

const signaturesData: Signature[] = [
  {
    filename: "Document1.pdf",
    signer: "John Doe",
    status: "Signed",
    signingDate: "2024-04-24",
    metadata: "Lorem ipsum dolor sit amet",
  },
  {
    filename: "Document2.pdf",
    signer: "Alice Smith",
    status: "Pending",
    signingDate: "2024-04-23",
    metadata: "Consectetur adipiscing elit",
  },
];

interface SignatureDetailsModalProps {
  signature: Signature | null;
  visible: boolean;
  onCancel: () => void;
}

const SignatureDetailsModal: React.FC<SignatureDetailsModalProps> = ({ signature, visible, onCancel }) => {
  const [verificationStatus, setVerificationStatus] = useState<string>("");

  const handleVerifySignature = () => {
    // Perform signature verification logic here
    setVerificationStatus("Verified");
  };

  return (
    <Modal
      title="Signature Details"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="verify" type="primary" onClick={handleVerifySignature}>
          Verify Signature
        </Button>,
        <Button key="close" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      {signature && (
        <>
          <p><strong>Signer:</strong> {signature.signer}</p>
          <p><strong>Status:</strong> {signature.status}</p>
          <p><strong>Signing Date:</strong> {signature.signingDate}</p>
          <p><strong>Metadata:</strong> {signature.metadata}</p>
          <p><strong>Verification Status:</strong> {verificationStatus}</p>
        </>
      )}
    </Modal>
  );
};

const Signatures: React.FC = () => {
  const [selectedSignature, setSelectedSignature] = useState<Signature | null>(null);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);

  const handleViewDetails = (signature: Signature) => {
    setSelectedSignature(signature);
    setDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setSelectedSignature(null);
    setDetailsVisible(false);
  };

  return (
    <>
      <List
        header={<div>Signed Files List</div>}
        bordered
        dataSource={signaturesData}
        renderItem={(signature, index) => (
          <List.Item
            key={index}
            actions={[
              <Button key={`view-${index}`} onClick={() => handleViewDetails(signature)}>View Details</Button>,
            ]}
          >
            <List.Item.Meta
              title={<a href="#">{signature.filename}</a>}
              description={<span>Status: {signature.status}</span>}
            />
          </List.Item>
        )}
      />
      <SignatureDetailsModal
        signature={selectedSignature}
        visible={detailsVisible}
        onCancel={handleCloseDetails}
      />
    </>
  );
};

export default Signatures;
