import { Box, Table, Thead, Tbody, Tr, Th, Td, Skeleton, SkeletonText } from '@chakra-ui/react';

export const TableSkeleton = () => {
  return (
    <Box overflowX="auto" borderWidth="1px" borderRadius="lg" p={4}>
      <Table variant="simple">
        {/* Cabeçalho da Tabela */}
        <Thead>
          <Tr>
            {Array(5).fill(0).map((_, index) => (
              <Th key={index}>
                <Skeleton height="20px" width="80%" />
              </Th>
            ))}
          </Tr>
        </Thead>

        {/* Corpo da Tabela */}
        <Tbody>
          {Array(5).fill(0).map((_, rowIndex) => (
            <Tr key={rowIndex}>
              {Array(5).fill(0).map((_, colIndex) => (
                <Td key={colIndex}>
                  <SkeletonText height="20px" width="100%" />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableSkeleton;
