import React, { useState } from "react";
import { Box, Container, Heading, VStack, Text, Input, Button, Stack, HStack, IconButton, useToast, Image } from "@chakra-ui/react";
import { FaSearch, FaHeart, FaRegHeart, FaPlus } from "react-icons/fa";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useToast();

  // Dummy data representing projects
  const initialProjects = [
    {
      id: 1,
      title: "Renewable Energy Initiative",
      description: "A project focused on creating sustainable energy solutions.",
      liked: false,
    },
    {
      id: 2,
      title: "Ocean Cleanup Project",
      description: "A global effort to reduce oceanic pollution and save marine life.",
      liked: false,
    },
    {
      id: 3,
      title: "Community Education Program",
      description: "Enhancing education facilities for underprivileged communities.",
      liked: false,
    },
  ];

  // Handling search functionality
  const handleSearch = () => {
    // Ideally, you would have a backend service to query, but for now we'll filter the dummy data
    const filteredProjects = initialProjects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()));
    setProjects(filteredProjects);
  };

  // Handling like functionality
  const handleLike = (projectId) => {
    setProjects((prevProjects) => prevProjects.map((project) => (project.id === projectId ? { ...project, liked: !project.liked } : project)));
    toast({
      title: `Project ${projectId} has been ${projects.find((p) => p.id === projectId).liked ? "disliked" : "liked"}.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} py={10}>
        <Heading as="h1" size="xl">
          Funder Connect
        </Heading>
        <Text align="center">Connect with project holders and discover amazing initiatives to fund.</Text>
        <HStack>
          <Input placeholder="Search for projects..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <IconButton aria-label="Search projects" icon={<FaSearch />} onClick={handleSearch} />
        </HStack>
        <Button leftIcon={<FaPlus />} colorScheme="blue">
          Add New Project
        </Button>
        <Stack spacing={5} w="full">
          {projects.length === 0 && <Text align="center">No projects found. Try searching for something else.</Text>}
          {projects.map((project) => (
            <Box key={project.id} p={5} shadow="md" borderWidth="1px">
              <Heading as="h3" size="md">
                {project.title}
              </Heading>
              <Text mt={4}>{project.description}</Text>
              <IconButton aria-label="Like project" icon={project.liked ? <FaHeart /> : <FaRegHeart />} onClick={() => handleLike(project.id)} colorScheme={project.liked ? "pink" : "gray"} variant="ghost" />
            </Box>
          ))}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;
