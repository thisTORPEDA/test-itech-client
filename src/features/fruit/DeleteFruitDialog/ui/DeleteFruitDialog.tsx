import { FC, ReactElement } from "react";
import { TBaseModalProps } from "../../../../shared/components/Modal.tsx";
import { TFruit } from "../../../../shared/types/fruits.ts";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useDeleteFruit } from "../../../../entities/fruit/api/fruitApi.ts";
import toast from "react-hot-toast";

interface DeleteFruitDialogProps extends TBaseModalProps {
  selectedFruit: TFruit | null;
}

export const DeleteFruitDialog: FC<DeleteFruitDialogProps> = ({
  isOpen,
  onClose,
  selectedFruit,
}: DeleteFruitDialogProps): ReactElement => {
  const { mutate: deleteFruit } = useDeleteFruit();

  const handleDelete = () => {
    if (selectedFruit)
      deleteFruit(selectedFruit?.id, {
        onSuccess: () => {
          onClose();
          toast.success("Фрукт удален");
        },
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Typography variant="body1">
          Вы точно хотите удалить {selectedFruit?.name}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button color="error" onClick={handleDelete}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
