import { FC, ReactElement, useState } from "react";
import { TFruit } from "../../../shared/types/fruits.ts";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaPen, FaTrash } from "react-icons/fa6";
import dayjs from "dayjs";
import UpdateFruitModal from "../../../features/fruit/UpdateFruitModal";
import CreateFruitModal from "../../../features/fruit/CreateFruitModal";
import DeleteFruitDialog from "../../../features/fruit/DeleteFruitDialog";

type FruitsTableProps = {
  fruits: TFruit[] | undefined;
};

export const FruitsTable: FC<FruitsTableProps> = ({
  fruits,
}: FruitsTableProps): ReactElement => {
  const [isOpenUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [selectedFruit, setSelectedFruit] = useState<TFruit | null>(null);

  const toggleUpdateModal = () => setOpenUpdateModal((prev) => !prev);
  const toggleDeleteDialog = () => setOpenDeleteDialog((prev) => !prev);
  const toggleCreateModal = () => setOpenCreateModal((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Button variant="contained" onClick={toggleCreateModal}>
        Добавить фрукт
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "100%",
          maxHeight: 500,
          overflow: "auto",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Table stickyHeader aria-label="Таблица фруктов" size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Фрукт</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Цвет
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 600 }}>
                Годен до
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fruits?.map((fruit) => (
              <TableRow
                key={fruit.name + fruit.id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                  {fruit.name}
                </TableCell>
                <TableCell align="right">{fruit.color}</TableCell>
                <TableCell align="left">
                  {dayjs(fruit.sellBy).format("DD.MM.YYYY")}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      onClick={() => {
                        toggleUpdateModal();
                        setSelectedFruit(fruit);
                      }}
                      color="primary"
                      size="small"
                      sx={{ "&:hover": { color: "primary.dark" } }}
                    >
                      <FaPen fontSize={16} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        toggleDeleteDialog();
                        setSelectedFruit(fruit);
                      }}
                      color="error"
                      size="small"
                      sx={{ "&:hover": { color: "error.dark" } }}
                    >
                      <FaTrash fontSize={16} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateFruitModal
        selectedFruit={selectedFruit}
        isOpen={isOpenUpdateModal}
        onClose={toggleUpdateModal}
      />
      <DeleteFruitDialog
        selectedFruit={selectedFruit}
        isOpen={isOpenDeleteDialog}
        onClose={toggleDeleteDialog}
      />
      <CreateFruitModal
        isOpen={isOpenCreateModal}
        onClose={toggleCreateModal}
      />
    </Box>
  );
};
