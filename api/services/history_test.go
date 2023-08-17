package services_test

import (
	"reflect"
	"testing"

	"github.com/seekr-osint/seekr/api/history"
	"github.com/seekr-osint/seekr/api/services"
)

func TestHistory_AddOrUpdateLatestItemBio(t *testing.T) {
	var h history.History[services.Bio]

	initialBio := services.Bio{Bio: "Initial bio"}
	h.AddOrUpdateLatestItem(initialBio)
	if len(h.History) != 1 {
		t.Errorf("Expected history length to be 1, but got %d", len(h.History))
	}
	if h.Latest == nil {
		t.Error("Expected Latest item to be not nil")
	}
	if !reflect.DeepEqual(h.Latest.Data, initialBio) {
		t.Errorf("Expected Latest bio to be %v, but got %v", initialBio, h.Latest)
	}

	originalLatest := h.Latest
	h.AddOrUpdateLatestItem(services.Bio{Bio: "Initial bio"})
	if len(h.History) != 1 {
		t.Errorf("Expected history length to still be 1, but got %d", len(h.History))
	}
	if !reflect.DeepEqual(h.Latest.Data, originalLatest.Data) {
		t.Error("Expected Latest bio to be equal after update")
	}

	newBio1 := services.Bio{Bio: "New bio 1"}
	h.AddOrUpdateLatestItem(newBio1)
	if len(h.History) != 2 {
		t.Errorf("Expected history length to be 3, but got %d", len(h.History))
	}
	if !reflect.DeepEqual(h.Latest.Data, newBio1) {
		t.Errorf("Expected Latest bio to be %v, but got %v", newBio1, h.Latest)
	}

	updatedBioAgain := services.Bio{Bio: "Updated bio again"}
	h.AddOrUpdateLatestItem(updatedBioAgain)
	if len(h.History) != 3 {
		t.Errorf("Expected history length to be 3, but got %d", len(h.History))
	}
	if h.Latest == nil {
		t.Error("Expected Latest item to be not nil")
	}
	if !reflect.DeepEqual(h.Latest.Data, updatedBioAgain) {
		t.Errorf("Expected Latest bio to be %v, but got %v", updatedBioAgain, h.Latest)
	}

	originalLatest = h.Latest
	h.AddOrUpdateLatestItem(updatedBioAgain)
	if len(h.History) != 3 {
		t.Errorf("Expected history length to still be 3, but got %d", len(h.History))
	}
	if h.Latest == nil {
		t.Error("Expected Latest item to be not nil")
	}
	if !reflect.DeepEqual(h.Latest.Data, originalLatest.Data) {
		t.Error("Expected Latest bio to be equal after update")
	}
}
