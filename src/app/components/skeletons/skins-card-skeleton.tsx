import { Box, Grid, Skeleton, SkeletonText } from '@chakra-ui/react';

const ProductSkeleton = () => {
  return (
    <Box borderWidth="1px" borderColor="gray.100" borderRadius="lg" overflow="hidden" p={4}>
      {/* Skeleton da Imagem */}
      <Skeleton height="150px" />

      {/* Skeleton dos Detalhes do Produto */}
      <Box mt={4}>
        <SkeletonText noOfLines={1} width="60%" />
        <SkeletonText mt={2} noOfLines={1} width="40%" />
      </Box>

      {/* Skeleton do Botão */}
      <Skeleton mt={4} height="32px" width="100px" />
    </Box>
  );
};

const ProductsGridSkeleton = () => {
  return (
    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
      {/* Gerando múltiplos skeletons */}
      {Array(8).fill(0).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </Grid>
  );
};


export default ProductsGridSkeleton;
