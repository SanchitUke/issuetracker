import { Button, CloseButton, Dialog, useDisclosure } from '@chakra-ui/react';
import React from 'react'

interface MembersListProps {
  memberNames: string[];
}

const MembersList: React.FC<MembersListProps> = (MembersListProps) => {
  const { open, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Members</Button>

      <Dialog.Root open={open} onClose={onClose}>
        <Dialog.Backdrop />
        <Dialog.Content>
          <Dialog.Header>Project Members</Dialog.Header>
          <Dialog.CloseTrigger>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
          <Dialog.Body>
            {MembersListProps.memberNames.map((m) => {
              return (
                // eslint-disable-next-line
                <div >{m}</div>
              )
            })}
          </Dialog.Body>

          <Dialog.Footer>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>

  );
};

export default MembersList;