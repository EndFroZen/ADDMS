'use client';
interface DeleteFileAndFolderProps {
    Path: string;
}
export default function DeleteFileAndFolder({ Path }: DeleteFileAndFolderProps) {
    return (
        <div>
            <h2>Delete {Path}</h2>
            <p>Are you sure you want to delete {Path}?</p>
            <button>Confirm</button>
        </div>
    );
}