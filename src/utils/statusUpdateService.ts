import { supabase } from "@/supabaseClient";

export async function updateServiceStatus(serviceId: string, newStatus: string): Promise<void> {
  // Check if a record exists
  const { data: existingTracking, error: checkError } = await supabase
    .from("service_tracking")
    .select("*")
    .eq("service_id", serviceId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError;
  }

  // Update or insert the record
  const { error } = existingTracking
    ? await supabase
        .from("service_tracking")
        .update({ 
          status: newStatus.toLowerCase(),
          updated_at: new Date().toISOString()
        })
        .eq("service_id", serviceId)
    : await supabase
        .from("service_tracking")
        .insert({ 
          service_id: serviceId, 
          status: newStatus.toLowerCase(),
          created_at: new Date().toISOString()
        });

  if (error) throw error;
}

export function setupStatusSubscription(
  serviceId: string | null, 
  callback: (serviceId: string, status: string) => void
) {
  let channelName = `service-tracking-${serviceId || 'all'}`;
  
  const channel = supabase
    .channel(channelName)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'service_tracking',
        ...(serviceId ? { filter: `service_id=eq.${serviceId}` } : {})
      },
      (payload) => {
        console.log('Real-time status update received:', payload);
        
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          const { service_id, status } = payload.new;
          callback(service_id, status);
        }
      }
    )
    .subscribe();

  return channel;
}
