import React, { useEffect, useState, Fragment } from "react";
import { ethers } from 'ethers';
import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

import { Flex, Heading, Icon } from "@chakra-ui/react";
import { SiChakraui } from "react-icons/si";
import { ChatIcon } from "@chakra-ui/icons";

const Index = () => (
  <Container height="100vh">
    <Hero />
    <Main>
      <Flex
        color="blue.600"
        fontSize="50px"
        justify="center"
        align="center"
        mt="100px"
      >
        <Heading>React/iconsのアイコンだよ！</Heading>
        <Icon as={SiChakraui} />
      </Flex>
      <Flex
        color="green.600"
        fontSize="50px"
        justify="center"
        align="center"
        mt="100px"
      >
        <Heading>Chakra-ui/iconsのアイコンだよ！</Heading>
        <ChatIcon />
      </Flex>
      <Text color="text">
        Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
        <Code>TypeScript</Code>.
      </Text>

      <List spacing={3} my={0} color="text">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://chakra-ui.com"
            flexGrow={1}
            mr={2}
          >
            Chakra UI <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer>
    <CTA />
  </Container>
)

export default Index
