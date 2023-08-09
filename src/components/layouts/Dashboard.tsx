"use client";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  CardBody,
  Card,
  Stack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { useState } from "react";
import {
  FaBackward,
  FaCalendar,
  FaClosedCaptioning,
  FaGraduationCap,
  FaList,
  FaListOl,
  FaPerson,
  FaUser,
} from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
  nama: string;
  level: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  level: String;
  status: Boolean;
}

const SidebarContent = ({ onClose, level, status, ...rest }: SidebarProps) => {
  const MenuStaf = () => {
    return (
      <>
        <NavItem icon={FaUser}>
          <Link href="/add-account">Add Acount</Link>
        </NavItem>
        <NavItem icon={FaListOl}>
          <Link href="/daftar-pengajuan">Pengajuan Judul</Link>
        </NavItem>
      </>
    );
  };

  const MenuKaprodi = () => {
    return (
      <>
        <NavItem icon={FaCalendar}>
          <Link href="/manajemen-pendaftaran">Manajemen Pendaftaran</Link>
        </NavItem>
        <NavItem icon={FaListOl}>
          <Link href="/daftar-pengajuan">Daftar Pengajuan</Link>
        </NavItem>
      </>
    );
  };

  const MenuMahasiswa = () => {
    return (
      <>
        <NavItem icon={FaList}>
          <Link href={"/bimbingan"}>Bimbingan</Link>
        </NavItem>
      </>
    );
  };

  return (
    <Box
      transition="3s ease"
      bg={"white"}
      borderRight="1px"
      borderRightColor={"gray.200"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <NavItem icon={FiHome}>
        <Link href="/">Home</Link>
      </NavItem>
      {level === "staf" ? <MenuStaf /> : ""}
      {level === "kaprodi" ? <MenuKaprodi /> : ""}
      {level === "dospem" ? (
        <NavItem icon={FaList}>
          <Link href={"/bimbingan"}>Bimbingan</Link>
        </NavItem>
      ) : (
        ""
      )}
      {status ? <MenuMahasiswa /> : ""}
      <NavItem icon={FaBackward}>
        <button>Logout</button>
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, nama, level, ...rest }: MobileProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    const response = await axios.post("/api/users/logout");
    if (response.data.success) {
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <Flex justifyContent={"center"} minH={"100vh"} alignItems={"center"}>
        <Card>
          <CardBody>
            <Stack spacing={3}>
              <Text>Prossess Logout...</Text>
              <Spinner />
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    );
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"white"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.200"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{nama}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {level}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={"white"} borderColor={"gray.200"}>
              <MenuItem onClick={() => router.push("/profile")}>
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                {loading ? <Spinner /> : null}
                <button
                  onClick={() => {
                    setLoading(true);
                    handleLogout();
                  }}
                >
                  Sign out
                </button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const DashboardLayout = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        level={user.level}
        status={user.status}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            level={user.level}
            onClose={onClose}
            status={user.status}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} nama={user.nama} level={user.level} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
