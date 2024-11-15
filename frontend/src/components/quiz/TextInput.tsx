import { Card, CardContent, CardHeader, Typography, TextField } from '@mui/material';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const TextInput = ({ value, onChange, disabled }: TextInputProps) => (
  <Card>
    <CardHeader
      title={<Typography variant="h6">Reading Text</Typography>}
    />
    <CardContent>
      <TextField
        placeholder="Paste the text you want to generate questions from..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        multiline
        rows={8}
        fullWidth
      />
    </CardContent>
  </Card>
);