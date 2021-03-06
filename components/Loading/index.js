import { Spinner, Flex } from '@chakra-ui/react'

const Loading = ({ white = false }) => {
  return (
    <Flex
      position="fixed"
      left="0"
      right="0"
      top="0"
      bottom="0"
      height="100%"
      justifyContent="center"
      alignItems="center"
      bg={white && 'white'}
    >
      <Spinner size="xl" color={white && 'black'} />
    </Flex>
  )
}

export default Loading
