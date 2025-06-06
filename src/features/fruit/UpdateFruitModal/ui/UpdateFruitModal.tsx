import { FC, ReactElement } from "react";
import Modal, {
  TBaseModalProps,
} from "../../../../shared/components/Modal.tsx";
import { Button, Stack, TextField } from "@mui/material";
import { TFruit } from "../../../../shared/types/fruits.ts";
import { useFormik } from "formik";
import { useUpdateFruit } from "../../../../entities/fruit/api/fruitApi.ts";
import { fruitPayloadSchema } from "../../../../entities/fruit/lib/fruitPayloadSchema.ts";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import toast from "react-hot-toast";

interface IUpdateFruitModalProps extends TBaseModalProps {
  selectedFruit: TFruit | null;
}

export const UpdateFruitModal: FC<IUpdateFruitModalProps> = ({
  isOpen,
  onClose,
  selectedFruit,
}: IUpdateFruitModalProps): ReactElement => {
  const { mutate: update, isPending } = useUpdateFruit();

  const formik = useFormik({
    initialValues: {
      name: selectedFruit?.name || "",
      color: selectedFruit?.color || "",
      sellBy: selectedFruit?.sellBy || "",
    },
    validationSchema: fruitPayloadSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (selectedFruit) {
        update(
          { id: selectedFruit?.id, ...values },
          {
            onSuccess: () => {
              formik.resetForm();
              onClose();
              toast.success("Фрукт обновлен");
            },
          },
        );
      }
    },
  });

  return (
    <Modal name="update-fruit" isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit();
        }}
      >
        <h2>Редактирование</h2>
        <Stack spacing={3} width={400}>
          <TextField
            label="Название"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
            value={formik.values.name}
          />
          <TextField
            label="Цвет"
            name="color"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.color && !!formik.errors.color}
            helperText={
              formik.touched.color && formik.errors.color
                ? formik.errors.color
                : ""
            }
            value={formik.values.color}
          />
          <DatePicker
            label="Годен до"
            value={dayjs(formik.values.sellBy)}
            onChange={(newValue) =>
              formik.setFieldValue("sellBy", dayjs(newValue).toISOString())
            }
            slotProps={{
              textField: {
                error: formik.touched.sellBy && Boolean(formik.errors.sellBy),
                helperText: formik.touched.sellBy && formik.errors.sellBy,
              },
            }}
          />
          <Button type="submit" variant="contained" disabled={isPending}>
            Изменить
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
