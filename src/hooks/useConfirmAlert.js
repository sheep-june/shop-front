import Swal from "sweetalert2";

export const useConfirmAlert = () => {
    const confirm = async ({
        title,
        text,
        confirmText = "確認",
        cancelText = "キャンセル",
    }) => {
        const result = await Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            customClass: {
                confirmButton: "tw-swal-delete",
                cancelButton: "tw-swal-cancel",
            },
            buttonsStyling: false,
        });
        return result.isConfirmed;
    };

    return { confirm };
};
