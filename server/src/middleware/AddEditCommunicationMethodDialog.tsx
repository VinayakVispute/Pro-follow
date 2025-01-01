import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

interface CommunicationMethod {
  name: string
  description: string
  sequence: number
  mandatory: boolean
}

interface AddEditCommunicationMethodDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit: (method: CommunicationMethod) => void
  initialData?: CommunicationMethod
}

export function AddEditCommunicationMethodDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData
}: AddEditCommunicationMethodDialogProps) {
  const [method, setMethod] = useState<CommunicationMethod>({
    name: '',
    description: '',
    sequence: 1,
    mandatory: false
  })

  useEffect(() => {
    if (initialData) {
      setMethod(initialData)
    } else {
      setMethod({
        name: '',
        description: '',
        sequence: 1,
        mandatory: false
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(method)
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add'} Communication Method</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={method.name}
              onChange={(e) => setMethod({ ...method, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={method.description}
              onChange={(e) => setMethod({ ...method, description: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="sequence">Sequence</Label>
            <Input
              id="sequence"
              type="number"
              value={method.sequence}
              onChange={(e) => setMethod({ ...method, sequence: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mandatory"
              checked={method.mandatory}
              onCheckedChange={(checked) => setMethod({ ...method, mandatory: checked as boolean })}
            />
            <Label htmlFor="mandatory">Mandatory</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? 'Save' : 'Add'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

