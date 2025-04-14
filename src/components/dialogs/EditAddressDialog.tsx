
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface EditAddressFormData {
  address: string;
}

interface EditAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAddress: string | null;
  onAddressUpdate: () => void;
}

export function EditAddressDialog({ open, onOpenChange, currentAddress, onAddressUpdate }: EditAddressDialogProps) {
  const form = useForm<EditAddressFormData>({
    defaultValues: {
      address: currentAddress || "",
    },
  });

  const onSubmit = async (data: EditAddressFormData) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          address: data.address,
        })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast.success("Address updated successfully!");
      onAddressUpdate();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
