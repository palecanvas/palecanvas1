// 1. Supabase Bağlantısı
const supabaseUrl = 'BURAYA_PROJECT_URL';
const supabaseKey = 'BURAYA_ANON_KEY';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Sayfa Yönetimi (Menü Geçişleri)
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) targetPage.classList.add('active');
    
    // Aktif menü ikonunu güncelle
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.getElementById('nav-' + pageId);
    if (navItem) navItem.classList.add('active');
}

// 3. Modal Kontrolleri
function openShare() { document.getElementById('shareModal').classList.add('open'); }
function closeShare() { document.getElementById('shareModal').classList.remove('open'); }

// 4. Veritabanına Kaydetme
async function createPost() {
    const title = document.getElementById('postTitle').value;
    const desc = document.getElementById('postDesc').value;
    const type = document.getElementById('postType').value;

    if (!title) {
        alert("Lütfen bir başlık girin!");
        return;
    }

    const { data, error } = await supabaseClient
        .from('posts')
        .insert([
            { 
                title: title, 
                description: desc, 
                type: type, 
                author_name: 'Eren' 
            }
        ]);

    if (error) {
        console.error("Hata:", error);
        alert("Paylaşırken bir sorun oluştu.");
    } else {
        alert("Başarıyla paylaşıldı!");
        closeShare();
        location.reload(); // Sayfayı yenileyip yeni postu gör
    }
}
