import { Button, CloseButton, Dialog, Portal, useDisclosure, List } from '@chakra-ui/react';
import React from 'react'

interface MembersListProps {
  memberNames: string[];
}

const  MembersList: React.FC<MembersListProps> = (MembersListProps) => {
  const { open, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Dialog.Root open={open} >
        <Dialog.Trigger>
          <Button onClick={onOpen}>Members</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Project Members</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <List.Root as="ol">
                  {MembersListProps.memberNames.map((m) => {
                    return (
                      // eslint-disable-next-line
                      <List.Item>{m}</List.Item>
                    )
                  })}
                </List.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>

  );
};

export default MembersList;