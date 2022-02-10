import { GridEnrichedColDef, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

interface handleClick {
    handleEditClick: (item: any) => void;
    handleDeleteClick: (item: any) => void;
}
export const useMuenuColumns = ({ handleEditClick, handleDeleteClick }: handleClick): GridEnrichedColDef[] => {
    return [
        { field: 'number', headerName: 'ID', width: 70, type: 'number' },
        { field: 'datetime', headerName: '등록일', width: 150 },
        { field: 'catagory', headerName: '카테고리명', width: 130 },
        { field: 'title', headerName: '메뉴명', width: 300 },
        { field: 'content1', headerName: '대표설명', width: 600 },
        { field: 'content2', headerName: '부가설명', width: 600 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '편집',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleEditClick(row)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(row)}
                    color="inherit"
                />,
            ],
        },
    ];
}


export const useStoreColumns = ({ handleEditClick, handleDeleteClick }: handleClick): GridEnrichedColDef[] => {
    return [
        { field: 'number', headerName: 'ID', width: 70, type: 'number' },
        { field: 'datetime', headerName: '등록일', width: 150 },
        { field: 'title', headerName: '매장 이름', width: 200 },
        { field: 'phonenumber', headerName: '전화번호', width: 300 },
        { field: 'operation', headerName: '매장 설명', width: 900 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '편집',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleEditClick(row)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(row)}
                    color="inherit"
                />,
            ],
        },
    ];
}


export const useFaqColumns = ({ handleEditClick, handleDeleteClick }: handleClick): GridEnrichedColDef[] => {
    return [
        { field: 'number', headerName: 'ID', width: 70, type: 'number' },
        { field: 'datetime', headerName: '등록일', width: 150 },
        { field: 'title', headerName: '제목', width: 200 },
        { field: 'content', headerName: '설명', width: 1200 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '편집',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleEditClick(row)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(row)}
                    color="inherit"
                />,
            ],
        },
    ];
}


export const useNoticeColumns = ({ handleEditClick, handleDeleteClick }: handleClick): GridEnrichedColDef[] => {
    return [
        { field: 'number', headerName: 'ID', width: 70, type: 'number' },
        { field: 'datetime', headerName: '등록일', width: 150 },
        { field: 'title', headerName: '제목', width: 200 },
        { field:'datetime',headerName: '등록일', width: 200},
        { field: 'content', headerName: '설명', width: 1200 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '편집',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleEditClick(row)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(row)}
                    color="inherit"
                />,
            ],
        },
    ];
}


export const useMainColumns = ({ handleEditClick, handleDeleteClick }: handleClick): GridEnrichedColDef[] => {
    return [
        { field: 'number', headerName: 'ID', width: 70, type: 'number' },
        { field: 'datetime', headerName: '등록일', width: 150 },
        { field: 'type', headerName: '화면 유형', width: 100 },
        { field:'fileName',headerName: '파일 이름', width: 800},
        {
            field: 'actions',
            type: 'actions',
            headerName: '편집',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleEditClick(row)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(row)}
                    color="inherit"
                />,
            ],
        },
    ];
}


export const useFranChiseColumns = ({ handleEditClick, handleDeleteClick }: handleClick): GridEnrichedColDef[] => {
    return [
        { field: 'number', headerName: 'ID', width: 70, type: 'number' },
        { field: 'datetime', headerName: '등록일', width: 150 },
        { field: 'description', headerName: '가맹절차 내용', width: 1000 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '편집',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleEditClick(row)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(row)}
                    color="inherit"
                />,
            ],
        },
    ];
}