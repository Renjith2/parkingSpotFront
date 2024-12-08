



import { Modal, Input, Button } from 'antd';
import { useState } from 'react';
import { updateBalance } from '../apis/updateBalance';

const WalletBalance = ({ setOpen, open, userinfo, setUserInfo }) => {
    const [addBalance, setAddBalance] = useState('');

    const handleCancel = () => {
        setOpen(false);
        setAddBalance('');
    };

    const updateFunction = async () => {
        if (!addBalance || isNaN(addBalance) || addBalance <= 0) {
            return alert('Please enter a valid amount.');
        }

        try {
            const payload = {
               
                amountToAdd: parseFloat(addBalance),
            };
            

            const updatedUser = await updateBalance(payload);

            console.log(updatedUser)

            setAddBalance('');
            setOpen(false);
        } catch (error) {
            console.error('Error updating wallet balance:', error);
            alert('Failed to update wallet balance.');
        }
    };

    return (
        <Modal
            title="Add Wallet Balance"
            open={open}
            onCancel={handleCancel}
            footer={null}
        >
            <div className="flex flex-col gap-4">
                <div>
                    <label className="font-semibold">Current Balance:</label>
                    <div className="text-lg font-bold">{userinfo.walletBalance || 0}</div>
                </div>
                <div>
                    <label className="font-semibold">Add Balance:</label>
                    <Input
                        type="number"
                        value={addBalance}
                        onChange={(e) => setAddBalance(e.target.value)}
                        placeholder="Enter amount to add"
                    />
                </div>
                <div className="text-right">
                    <Button
                        type="primary"
                        onClick={updateFunction}
                    >
                        Update Balance
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default WalletBalance;
