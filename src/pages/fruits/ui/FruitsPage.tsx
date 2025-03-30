import { FC, ReactElement, useCallback } from "react";
import { Page } from "../../../shared/components/Page.tsx";
import {
  useCreateMockFruits,
  useGetAllFruits,
} from "../../../entities/fruit/api/fruitApi.ts";
import { Box, Button, CircularProgress } from "@mui/material";
import FruitsTable from "../../../widgets/fruits";

export const FruitsPage: FC = (): ReactElement => {
  const { data: fruits = [], isLoading, isError } = useGetAllFruits();
  const { mutate: createMock } = useCreateMockFruits();

  const handleCreateMock = useCallback(() => {
    createMock();
  }, [createMock]);

  if (isLoading) {
    return (
      <Page>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Page>
    );
  }

  if (isError) {
    return (
      <Page>
        <Box display="flex" justifyContent="center" mt={4}>
          <h2>Произошла ошибка при загрузке данных</h2>
        </Box>
      </Page>
    );
  }

  return (
    <Page>
      <Box mb={2}>
        <Button variant="contained" onClick={handleCreateMock}>
          Создать 5 тестовых фруктов
        </Button>
      </Box>

      {fruits.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <h2>Данные отсутствуют</h2>
        </Box>
      ) : (
        <FruitsTable fruits={fruits} />
      )}
    </Page>
  );
};
