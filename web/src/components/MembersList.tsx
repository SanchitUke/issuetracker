import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'

interface MembersListProps {
  memberNames: string[];
}

const MembersList: React.FC<MembersListProps> = (MembersListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Members</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Members</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {MembersListProps.memberNames.map((m) => {
              return (
                // eslint-disable-next-line
                <div >{m}</div>
              )
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  );
};

export default MembersList;